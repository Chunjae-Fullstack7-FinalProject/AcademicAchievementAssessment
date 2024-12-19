package net.fullstack7.aaa.common.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.fullstack7.aaa.config.JwtTokenProvider;
import net.fullstack7.aaa.service.member.MemberServiceIf;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CookieUtil {
    private final JwtTokenProvider jwtTokenProvider;

    //jwttokenprovider 주입
    public CookieUtil(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //문자열 -> 숫자 변환
    public int getStringToInt(String str, int defaultValue) {
        return(StringUtils.isNumeric(str) ? Integer.parseInt(str) : defaultValue);
    }

    //쿠키 설정
    public void setCookiesInfo(
            HttpServletRequest req, HttpServletResponse res,
            String path, int maxAge, String domain, String cName, String cValue
    ){
        Cookie cookies = new Cookie(cName, cValue);
        cookies.setMaxAge(maxAge);
        cookies.setPath(path);
        cookies.setDomain(domain != null ? domain : "/");
        res.addCookie(cookies);
    }

    //쿠키 값 추출
    public String getCookieValue(HttpServletRequest req, String cName) {
        Cookie[] cookies = req.getCookies();
        if(cookies != null) {
            for(Cookie c : cookies) {
                String cookieName = c.getName();
                String cookieValue = c.getValue();
                if(cookieName.equals(cName)) return cookieValue;
            }
        }
        return "";
    }

    //uuid
    public static String makeUuid(){
        return UUID.randomUUID().toString();
    }

    //jwt 에서 memberId 추출(가져다써)
    public String getMemberIdInJwt(MemberServiceIf memberService, HttpServletRequest req) {
        String accessToken = this.getCookieValue(req, "accessToken");
        if(accessToken != null && jwtTokenProvider.validateToken(accessToken)){
            return jwtTokenProvider.getMemberId(accessToken);
        }
        return null;
    }
}
