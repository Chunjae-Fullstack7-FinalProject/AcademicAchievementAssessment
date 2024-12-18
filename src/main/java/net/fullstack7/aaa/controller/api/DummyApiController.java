package net.fullstack7.aaa.controller.api;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.function.client.WebClient;

import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.common.util.ApiResponseUtil;
import net.fullstack7.aaa.dto.exam.ItemListResponse;
import net.fullstack7.aaa.dto.exam.ItemInfo;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@Logging(message = "문제은행 API 점점부 더미데이터 서빙 API 엔드포인트")
@RestController
@RequestMapping("/dummy/api/exam")
public class DummyApiController {
    //시험지 더미데이터
    public static Integer[] itemIdList = { 966536, 1588525, 1588526, 1589103, 1589104 };

    @GetMapping("/items")
    @Logging(message = "문제 아이디 리스트 조회 API")
    public ApiResponseUtil<?> dummy1() {
        return ApiResponseUtil.success("더미데이터 조회 성공", Map.of("itemIdList", itemIdList));
    }

    @GetMapping("/items/test")
    @Logging(message = "문제 아이디 리스트로 천재API 호출 후 문제정보 리스트 조회 API 테스트용")
    public Mono<ApiResponseUtil<?>> dummy2() {
        // WebClient 생성
        WebClient webClient = WebClient.create("https://tsherpa.item-factory.com");
        
        // Request body 생성
        Map<String, List<Integer>> requestBody = new HashMap<>();
        requestBody.put("itemIdList", Arrays.asList(itemIdList));
        
        return webClient.post()
            .uri("/item/item-list")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(ItemListResponse.class)
            .map(response -> ApiResponseUtil.success("문제 정보 조회 성공", response));
    }
}
