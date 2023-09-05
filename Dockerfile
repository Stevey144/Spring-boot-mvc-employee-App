FROM openjdk:17-alpine

EXPOSE 8080

ADD target/thymeleafdemo-0.0.1-SNAPSHOT.jar thymeleafdemo-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "thymeleafdemo-0.0.1-SNAPSHOT.jar"]