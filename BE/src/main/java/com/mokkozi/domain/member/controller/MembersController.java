package com.mokkozi.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mokkozi.domain.member.dto.MembersCreateRequest;
import com.mokkozi.domain.member.dto.MembersLoginRequest;
import com.mokkozi.domain.member.dto.MembersLoginResponse;
import com.mokkozi.domain.member.repository.MembersRepository;
import com.mokkozi.domain.member.service.MembersService;
import com.mokkozi.global.oauth.token.TokenDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/user")
@RestController
public class MembersController {
	private final MembersRepository membersRepository;
	private final MembersService memberService;
	
	@GetMapping("/test")
	public String test(){
        return "test";
    }
	
	@PostMapping("/register")
	public ResponseEntity<MembersLoginResponse> signup(@RequestBody MembersCreateRequest request) throws Exception {
        return new ResponseEntity<>(memberService.register(request), HttpStatus.OK);
    }
	@PostMapping("/login")
    public ResponseEntity<MembersLoginResponse> signin(@RequestBody MembersLoginRequest request) throws Exception {
        return new ResponseEntity<>(memberService.login(request), HttpStatus.OK);
    }
	
	@GetMapping("/refresh")
    public ResponseEntity<TokenDto> refresh(@RequestBody TokenDto token) throws Exception {
        return new ResponseEntity<>( memberService.refreshAccessToken(token), HttpStatus.OK);
    } 

	// 메일 중복 확인
	@GetMapping("/checkemail")
	public ResponseEntity<?> checkemail(@RequestParam(name = "email") String email) {
		return ResponseEntity.ok(memberService.checkemail(email));
	}
	//닉네임 중복 확인
	@GetMapping("/checknickname")
	public ResponseEntity<?> checknickname(@RequestParam(name = "nickname") String nickname) {
		return ResponseEntity.ok(memberService.checknickname(nickname));
	}
}
