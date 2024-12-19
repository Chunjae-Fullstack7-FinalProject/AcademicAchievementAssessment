package net.fullstack7.aaa.service.report;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.domain.Member;
import net.fullstack7.aaa.domain.Solve;
import net.fullstack7.aaa.dto.report.ExamResultDTO;
import net.fullstack7.aaa.dto.report.ExternalExamResponseDTO;
import net.fullstack7.aaa.dto.report.SubmitExamDTO;
import net.fullstack7.aaa.repository.MemberRepository;
import net.fullstack7.aaa.repository.QuestionStatsRepository;
import net.fullstack7.aaa.repository.SolveRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Logging(message = "ReportService")
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
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));

        for (SubmitExamDTO.AnswerDTO userAnswer : submitExamDTO.getAnswers()) {
            String correctAnswer = answerMap.get(userAnswer.getItemId());
            boolean isCorrect = correctAnswer != null && correctAnswer.trim().equals(userAnswer.getAnswer().trim());

            Solve existingSolve = solveRepository.findByExamIdAndMember_MemberIdAndItemId(
                    submitExamDTO.getExamId(),
                    memberId,
                    userAnswer.getItemId()
            );

            if (existingSolve != null) {
                Solve updatedSolve = Solve.builder()
                        .idx(existingSolve.getIdx())
                        .examId(existingSolve.getExamId())
                        .itemId(existingSolve.getItemId())
                        .member(existingSolve.getMember())
                        .answer(userAnswer.getAnswer())
                        .isCorrect(isCorrect)
                        .time(userAnswer.getTimeSpent())
                        .submittedAt(LocalDateTime.now())
                        .build();
                solveRepository.save(updatedSolve);
            } else {
                Solve newSolve = Solve.builder()
                        .examId(submitExamDTO.getExamId())
                        .itemId(userAnswer.getItemId())
                        .member(member)
                        .answer(userAnswer.getAnswer())
                        .isCorrect(isCorrect)
                        .time(userAnswer.getTimeSpent())
                        .submittedAt(LocalDateTime.now())
                        .build();
                solveRepository.save(newSolve);
            }
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

    public ExamResultDTO getExamResult(Long examId, String memberId, String subjectName) {
        String memberName = memberRepository.findById(memberId)
                .map(Member::getName)
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));

        List<Solve> solves = solveRepository.findByExamIdAndMember_MemberId(examId, memberId);

        if (solves.isEmpty()) {
            throw new RuntimeException("해당 시험에 대한 풀이 기록이 없습니다.");
        }

        long correctItemCount = solves.stream().filter(Solve::getIsCorrect).count();
        int totalItemCount = solves.size();

        List<ExamResultDTO.QuestionResultDTO> questionResults = solves.stream()
                .map(solve -> ExamResultDTO.QuestionResultDTO.builder()
                        .isCorrect(solve.getIsCorrect())
                        .explanationUrl("/report/explanation/" + solve.getItemId()) // 해설 URL 생성
                        .build())
                .collect(Collectors.toList());

        return ExamResultDTO.builder()
                .name(memberName)
                .subjectName(subjectName)
                .submitAt(LocalDate.now().toString())
                .totalItem(totalItemCount)
                .correctItem((int) correctItemCount)
                .questionResults(questionResults)
                .build();
    }
}
