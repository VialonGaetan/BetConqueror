package org.polytech.si5.betConqueror;

import org.polytech.si5.betConqueror.models.Race;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BetConquerorApplication {

	public static void main(String[] args) {
		System.out.println(Race.valueOf("ESPAGNOL").getTags().toString());
		SpringApplication.run(BetConquerorApplication.class, args);
	}

}
