package com.example.productmanagerday4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import java.util.Scanner;

@SpringBootApplication
public class ProductManagerDay4Application {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		ApplicationContext context = SpringApplication.run(ProductManagerDay4Application.class, args);
		ProductService service =context.getBean(ProductService.class);
	}
}
