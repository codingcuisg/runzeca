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

/**
 *
 * @author yello
 */
@WebServlet(urlPatterns = "/save/*")
public class saveGif extends HttpServlet {
        static int count = 0;
        Properties prop = new Properties();
        String userName = "";
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {  
            resp.setHeader("Access-Control-Allow-Origin", "*");
            String pathInfo = req.getPathInfo();
            System.out.println(pathInfo);
            String url = pathInfo.substring(1);
            String[] urllink = url.split("/");
            String imgUrl = "";
            for (int i = 0 ;i<urllink.length-1;i++){
                  imgUrl = imgUrl + '/' + urllink[i];
            }
            prop.put("user", "app");
            prop.put("password", "app"); 
            userName = urllink[urllink.length - 1];
            System.out.println("url>>>>>>>>>>>>" + imgUrl.substring(1));
            System.out.println("username>>>>>>>>>>>>" + urllink[urllink.length - 1]);
            try {
                Connection conn = DriverManager.getConnection("jdbc:derby://localhost:1527/sample",prop);              
                
		Statement stmt = conn.createStatement();
                    stmt.executeUpdate("INSERT INTO Gif (userName, url) values ('" + userName + "'," + "'" + imgUrl.substring(1) +"')");         
                System.out.println("save successful.");
            } catch (SQLException ex) {
                Logger.getLogger(getGif.class.getName()).log(Level.SEVERE, null, ex);
            }   
        
	}
}
