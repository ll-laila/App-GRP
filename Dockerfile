FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR file into the container
COPY ./*.jar app.jar

# Set the entrypoint and expose port
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
EXPOSE 8080
