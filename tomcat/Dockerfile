FROM openjdk:11-jdk-slim

# Define environment variables
ENV TOMCAT_VERSION=9.0.87
ENV CATALINA_HOME=/opt/tomcat
ENV PATH="$CATALINA_HOME/bin:$PATH"

# Install curl and download Tomcat
RUN apt-get update && apt-get install -y curl && \
    curl -fSL https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.102/bin/apache-tomcat-9.0.102.tar.gz | tar -xzC /opt && \
    mv /opt/apache-tomcat-9.0.102 /opt/tomcat && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy custom configuration or WAR files (optional)
COPY config/ /opt/tomcat/conf/
COPY webapps/ /opt/tomcat/webapps/

# Expose Tomcat port
EXPOSE 8080

# CMD to keep Tomcat running in foreground
CMD ["/opt/tomcat/bin/catalina.sh", "run"]