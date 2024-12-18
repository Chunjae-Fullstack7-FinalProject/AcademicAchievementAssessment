package net.fullstack7.aaa.service.report;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.domain.Member;
import net.fullstack7.aaa.domain.Solve;
import net.fullstack7.aaa.dto.report.ExternalExamResponseDTO;
import net.fullstack7.aaa.dto.report.SubmitExamDTO;
import net.fullstack7.aaa.repository.MemberRepository;
import net.fullstack7.aaa.repository.QuestionStatsRepository;
import net.fullstack7.aaa.repository.SolveRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Logging
public class ReportServiceImpl {

    private final SolveRepository solveRepository;
    private final QuestionStatsRepository questionStatsRepository;
    private final MemberRepository memberRepository;
    private final WebClient webClient;

    @Transactional
    public void examSubmission(String memberId, SubmitExamDTO submitExamDTO) {
        List<Long> itemIdList = submitExamDTO.getAnswers().stream()
                .map(SubmitExamDTO.AnswerDTO::getQuestionId)
                .collect(Collectors.toList());

        ExternalExamResponseDTO externalData = fetchExamData(itemIdList);

        Map<Long, String> answerMap = externalData.getItemList().stream()
                .collect(Collectors.toMap(ExternalExamResponseDTO.ItemDTO::getQuestionId, ExternalExamResponseDTO.ItemDTO::getAnswer));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        for (SubmitExamDTO.AnswerDTO userAnswer : submitExamDTO.getAnswers()) {
            String correctAnswer = answerMap.get(userAnswer.getQuestionId());
            boolean isCorrect = correctAnswer != null && correctAnswer.equals(userAnswer.getAnswer());

            Solve solve = Solve.builder()
                    .examId(submitExamDTO.getExamId())
                    .questionId(userAnswer.getQuestionId())
                    .member(member)
                    .answer(userAnswer.getAnswer())
                    .isCorrect(isCorrect)
                    .time(userAnswer.getTimeSpent())
                    .submittedAt(LocalDateTime.now())
                    .build();
            solveRepository.save(solve);

            questionStatsRepository.findById(userAnswer.getQuestionId()).ifPresent(stats -> {
                if (isCorrect) {
                    stats.incrementCorrectCount();
                } else {
                    stats.incrementWrongCount();
                }
                stats.updateTimestamp();
                questionStatsRepository.save(stats);
            });
        }
    }

    private ExternalExamResponseDTO fetchExamData(List<Long> itemIdList) {
        String externalUrl = "https://tsherpa.item-factory.com/item/item-list";

        Map<String, List<Long>> requestBody = Map.of("itemIdList", itemIdList);

        return webClient.post()
                .uri(externalUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(ExternalExamResponseDTO.class)
                .block();
    }
}
