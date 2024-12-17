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

    @Around("@annotation(logging)")
    public Object logMethodExecution(ProceedingJoinPoint joinPoint, Logging logging) throws Throwable {
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        logger.info("==> Starting method: {}.{} - {}", className, methodName, logging.message());
        logger.info("==> Parameters: {}", Arrays.toString(args));
        
        long startTime = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            logger.info("==> Method returned: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("==> Method threw exception: {}", e.getMessage());
            throw e;
        } finally {
            long endTime = System.currentTimeMillis();
            logger.info("==> Finished method: {}.{} - Execution time: {} ms", 
                className, methodName, (endTime - startTime));
        }
    }

    @Around("@within(logging)")
    public Object logClassExecution(ProceedingJoinPoint joinPoint, Logging logging) throws Throwable {
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        logger.info("==> Starting class method: {}.{} - {}", className, methodName, logging.message());
        logger.info("==> Parameters: {}", Arrays.toString(args));
        
        long startTime = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            logger.info("==> Method returned: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("==> Method threw exception: {}", e.getMessage());
            throw e;
        } finally {
            long endTime = System.currentTimeMillis();
            logger.info("==> Finished class method: {}.{} - Execution time: {} ms", 
                className, methodName, (endTime - startTime));
        }
    }
}
