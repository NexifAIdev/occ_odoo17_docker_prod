# Use the official Tomcat base image
FROM tomcat:9.0.82-jdk11

# Install unzip and Java compiler
RUN apt-get update && \
    apt-get install -y unzip openjdk-11-jdk && \
    rm -rf /var/lib/apt/lists/*

# Clear default webapps (optional for clean deploy)
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy WAR file into container
COPY webapps/pentaho-reports-for-odoo.war /tmp/

# Copy Java source and properties for XML-RPC
COPY custom/PentahoRenderer.java /tmp/
COPY custom/XmlRpcServlet.properties /tmp/

# Unzip the WAR to modify it
RUN mkdir /tmp/expanded && \
    cd /tmp/expanded && \
    unzip -o /tmp/pentaho-reports-for-odoo.war

# Create destination directory for Java class and compile it
RUN mkdir -p /tmp/expanded/WEB-INF/classes/com/willdooit/reporting && \
    javac -classpath "/usr/local/tomcat/lib/servlet-api.jar" \
    -d /tmp/expanded/WEB-INF/classes \
    /tmp/PentahoRenderer.java

# Copy the XmlRpcServlet.properties file to register the handler
RUN mkdir -p /tmp/expanded/WEB-INF/classes/org/apache/xmlrpc/webserver && \
    cp /tmp/XmlRpcServlet.properties \
       /tmp/expanded/WEB-INF/classes/org/apache/xmlrpc/webserver/

# Rebuild the WAR with the new files
RUN cd /tmp/expanded && \
    jar -cvf /usr/local/tomcat/webapps/pentaho-reports-for-odoo.war *

# Done. Tomcat will auto-deploy the WAR on container start

CMD ["catalina.sh", "run"]