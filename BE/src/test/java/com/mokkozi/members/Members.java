package com.mokkozi.members;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mokkozi.domain.member.repository.MembersRepository;
@SpringBootTest
class Members {
	MembersRepository re;
	@Autowired
	Optional<com.mokkozi.domain.member.entity.Members> member;
	
	@Test
	void contextLoads() {
		
	}

}
