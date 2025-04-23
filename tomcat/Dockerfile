# --------------------------------------------
# 🔧 Base Tomcat with JDK 11
# --------------------------------------------
FROM tomcat:9.0.82-jdk11

# --------------------------------------------
# 📂 Set working directory
# --------------------------------------------
WORKDIR /usr/local/tomcat

# --------------------------------------------
# 📁 Copy pre-unzipped servlet webapp
# --------------------------------------------
COPY webapps/pentaho-reports-for-odoo /usr/local/tomcat/webapps/pentaho-reports-for-odoo

# --------------------------------------------
# 🩺 Healthcheck
# --------------------------------------------
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -sf http://localhost:8080/ || exit 1

# --------------------------------------------
# 🚪 Expose Tomcat port and start
# --------------------------------------------
EXPOSE 8080
CMD ["catalina.sh", "run"]