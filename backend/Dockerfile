FROM openjdk:17.0.2-jdk-slim
RUN apt-get update && apt-get install -y redis-tools
ARG JAR_FILE=target/HDT-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} HDT_backend.jar
ENTRYPOINT ["java", "-jar","/HDT_backend.jar"]
EXPOSE 8090