FROM tomcat:9.0 AS tomcat
FROM maven:3.3.9-jdk-8
WORKDIR /java
COPY . /java
COPY --from=tomcat /usr/local /java
RUN mvn package
EXPOSE 8080
CMD tomcat/bin/catalina.sh run