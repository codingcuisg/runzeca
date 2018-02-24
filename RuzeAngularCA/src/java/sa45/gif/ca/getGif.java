/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sa45.gif.ca;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import static sa45.gif.ca.saveGif.count;

@WebServlet(urlPatterns = "/getGif/*")
public class getGif extends HttpServlet {

        Properties prop = new Properties();
        String userName;
        
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {  
            resp.setHeader("Access-Control-Allow-Origin", "*");
            prop.put("user", "app");
            prop.put("password", "app");      
            String pathInfo = req.getPathInfo();
            System.out.println(pathInfo.substring(1));
            userName = pathInfo.substring(1);
            JsonArrayBuilder custBuilder = Json.createArrayBuilder();
            System.out.println("select * from gif where UserName = " + "'" + userName + "'");
            try {
                Connection conn = DriverManager.getConnection("jdbc:derby://localhost:1527/sample",prop);
                

		Statement stmt = conn.createStatement();
                System.out.println("select * from gif where UserName = " + "'" + userName + "'");
		ResultSet rs = stmt.executeQuery("select * from gif where UserName =" + "'" + userName + "'");
                        
		while (rs.next()) {
                    JsonObject cust = Json.createObjectBuilder()
					.add("userName", rs.getString("userName"))
					.add("url", rs.getString("url"))
					.build();
                    custBuilder.add(cust);
		}
		rs.close();    
            } catch (SQLException ex) {
                Logger.getLogger(getGif.class.getName()).log(Level.SEVERE, null, ex);
            }   
            
            try (PrintWriter pw = resp.getWriter()) {
                
		resp.setStatus(HttpServletResponse.SC_OK);
		resp.setContentType(MediaType.APPLICATION_JSON);
		pw.println(custBuilder.build().toString());
            }
	}
}

