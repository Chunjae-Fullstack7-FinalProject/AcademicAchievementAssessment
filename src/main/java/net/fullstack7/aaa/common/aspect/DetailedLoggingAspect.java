package net.fullstack7.aaa.common.aspect;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import net.fullstack7.aaa.common.annotation.Logging;
import java.util.Arrays;
import java.lang.reflect.Method;

@Aspect
@Component
public class DetailedLoggingAspect {

    private static final Logger logger = LogManager.getLogger(DetailedLoggingAspect.class);

    @Around("@annotation(logging) || @within(logging)")
    public Object logExecution(ProceedingJoinPoint joinPoint, Logging logging) throws Throwable {
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        boolean isClassLevel = joinPoint.getSignature().getDeclaringType().isAnnotationPresent(Logging.class);
        String prefix = isClassLevel ? "클래스 메소드" : "메소드";
        logger.info("--------------시작---------------");
        logger.info("==> {} 시작: {}.{} - {}", prefix, className, methodName, logging.message());
        logger.info("==> 파라미터: {}", Arrays.toString(args));
        
        long startTime = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            logger.info("==> 메소드 반환: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("==> 메소드 예외 발생: {}", e.getMessage());
            throw e;
        } finally {
            long endTime = System.currentTimeMillis();
            logger.info("==> {} 종료: {}.{} - 실행 시간: {} ms",
                prefix, className, methodName, (endTime - startTime));
            logger.info("--------------종료---------------");
        }
    }
}
