package net.fullstack7.aaa.controller.api;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.servlet.http.HttpServletRequest;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.common.util.ApiResponseUtil;
import net.fullstack7.aaa.dto.exam.ItemListResponse;
import net.fullstack7.aaa.dto.exam.ItemInfo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;
import org.springframework.web.bind.annotation.RequestBody;

@Logging(message = "문제은행 API 점점부 더미데이터 서빙 API 엔드포인트")
@RestController
@RequestMapping("/dummy/api/exam")
public class DummyApiController {
    // 시험지 더미데이터
    public static Integer[] itemIdList = { 966536, 1588525, 1588526, 1589103, 1589104 };

    @GetMapping("/items")
    @Logging(message = "문제 아이디 리스트 조회 API")
    public ApiResponseUtil<?> dummy1() {
        return ApiResponseUtil.success("더미데이터 조회 성공", Map.of("itemIdList", itemIdList));
    }
}
