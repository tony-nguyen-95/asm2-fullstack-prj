#!/bin/bash

# Check if the filename is passed as an argument
if [ -z "$1" ]; then
    echo "Usage: ./make-jsp.sh <file-name>"
    exit 1
fi

# Convert the parameter (e.g., demo-test) to CamelCase (e.g., DemoTest)
FILENAME=$(echo "$1" | awk -F'-' '{ for(i=1; i<=NF; i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2)) } 1' OFS='')

SERVLET_PATH="./src/main/java/com/asm/asm1/${FILENAME}Servlet.java"
APP_PATH="./src/main/java/com/asm/asm1/Asm2Application.java"

# Add a new ServletRegistrationBean in Asm2Application.java
echo "Updating ${APP_PATH} with a new ServletRegistrationBean for ${FILENAME}Servlet"
sed -i '' "/public class Asm2Application {/a\\
\\
    @Bean\\
    public ServletRegistrationBean<${FILENAME}Servlet> ${FILENAME}ServletRegistration() {\\
        ServletRegistrationBean<${FILENAME}Servlet> registrationBean = new ServletRegistrationBean<>(new ${FILENAME}Servlet(),\\
                \"/$1\");\\
        return registrationBean;\\
    }\\
" $APP_PATH

# Create a new servlet file
echo "Creating servlet file at ${SERVLET_PATH}"
cat <<EOL >$SERVLET_PATH
package com.asm.asm1;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;

@WebServlet("/api/$1")
public class ${FILENAME}Servlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        String jsonData = "[{\"name\": \"Hello\", \"age\": 30}, {\"name\": \"Hi\", \"age\": 25}]";
        
        out.print(jsonData);
        out.flush();
    }
}
EOL

echo "Done! $1 route and corresponding servlet have been created."
