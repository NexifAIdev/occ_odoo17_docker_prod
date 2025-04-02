package com.willdooit.reporting;

public class PentahoRenderer {
    public String getReport(String reportName, String dbHost, String dbName, String dbUser, String dbPassword) {
        return "Successfully received: " + reportName + " from DB " + dbName;
    }
}