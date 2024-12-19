package net.fullstack7.aaa.service.report;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
@Log4j2
public class ReportServiceImpl {

    private final SolveRepository solveRepository;
    private final QuestionStatsRepository questionStatsRepository;
    private final MemberRepository memberRepository;
    private final WebClient webClient;

    @Transactional
    public void examSubmission(String memberId, SubmitExamDTO submitExamDTO) {
        List<Long> itemIdList = submitExamDTO.getAnswers().stream()
                .map(SubmitExamDTO.AnswerDTO::getItemId)
                .collect(Collectors.toList());

        ExternalExamResponseDTO externalData = fetchExamData(itemIdList);

        Map<Long, String> answerMap = externalData.getItemList().stream()
                .collect(Collectors.toMap(ExternalExamResponseDTO.ItemDTO::getItemId, ExternalExamResponseDTO.ItemDTO::getAnswer));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원 정보가 없습니다"));

        for (SubmitExamDTO.AnswerDTO userAnswer : submitExamDTO.getAnswers()) {
            String correctAnswer = answerMap.get(userAnswer.getItemId());
            boolean isCorrect = correctAnswer != null && correctAnswer.equals(userAnswer.getAnswer());

            Solve solve = Solve.builder()
                    .examId(submitExamDTO.getExamId())
                    .itemId(userAnswer.getItemId())
                    .member(member)
                    .answer(userAnswer.getAnswer())
                    .isCorrect(isCorrect)
                    .time(userAnswer.getTimeSpent())
                    .submittedAt(LocalDateTime.now())
                    .build();
            solveRepository.save(solve);

//            questionStatsRepository.findById(userAnswer.getItemId()).ifPresent(stats -> {
//                if (isCorrect) {
//                    stats.incrementCorrectCount();
//                } else {
//                    stats.incrementWrongCount();
//                }
//                stats.updateTimestamp();
//                questionStatsRepository.save(stats);
//            });
        }
    }

    private ExternalExamResponseDTO fetchExamData(List<Long> itemIdList) {
        String externalUrl = "https://tsherpa.item-factory.com/item/item-list";
        Map<String, List<Long>> requestBody = Map.of("itemIdList", itemIdList);

//        log.info("Request Body{}", requestBody);

        ExternalExamResponseDTO response = webClient.post()
                .uri(externalUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(ExternalExamResponseDTO.class)
                .block(); // 테스트할때 사용

        // 응답 데이터 로깅
//        log.info("External API Response{}", response);

        return response;
    }

}
