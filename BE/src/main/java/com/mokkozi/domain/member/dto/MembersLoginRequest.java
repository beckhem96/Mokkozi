package com.mokkozi.domain.member.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Data
public class MembersLoginRequest {
	private Long id;

	private String password;

	private String email;

}
