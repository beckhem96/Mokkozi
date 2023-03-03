package com.mokkozi.domain.chat.service;

import java.util.Collections;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mokkozi.domain.member.dto.MembersCreateRequest;
import com.mokkozi.domain.member.dto.MembersLoginRequest;
import com.mokkozi.domain.member.dto.MembersLoginResponse;
import com.mokkozi.domain.member.entity.Authority;
import com.mokkozi.domain.member.entity.Members;
import com.mokkozi.domain.member.repository.MembersRepository;
import com.mokkozi.global.oauth.token.JwtProvider;
import com.mokkozi.global.oauth.token.TokenDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;
	private final MembersRepository memberRepository;
	
	//이메일 중복확인
	public String checkemail(String email) {
		String content;
		if (memberRepository.findByEmail(email).isEmpty()) {
			content = "사용 가능한 메일";
		} else {
			content = "사용 불가능한 메일";
		}
		return content;
	}
	
	//닉네임 중복확인
	public String checknickname(String nickname) {
		String content;
		if (memberRepository.findByNickname(nickname).isEmpty()) {
			content = "사용 가능한 닉네임";
		} else {
			content = "사용 불가능한 닉네임";
		}
		return content;
	}
	
	 public MembersLoginResponse login(MembersLoginRequest request) throws Exception {
	     //이메일 존재하는지 확인   
		 Members member = memberRepository.findByEmail(request.getEmail()).orElseThrow(() ->
	                new BadCredentialsException("잘못된 계정정보입니다."));
		 //비밀번호가 맞는지 확인
	    if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
	        throw new BadCredentialsException("잘못된 계정정보입니다.");
	    }
	    
	    TokenDto token = TokenDto.builder().
	    		access_Token(jwtProvider.createToken(member.getEmail(), member.getRoles(),1000*60*60))
                .refresh_Token(jwtProvider.createToken(member.getEmail(), member.getRoles(),1000*60*60*12*3))
                .build(); 

	    member.setRefreshToken(token.getRefresh_Token());
		memberRepository.save(member);
	    
	    return MembersLoginResponse.builder()
	            .id(member.getId())
	            .email(member.getEmail())
	            .nickname(member.getNickname())
	            .roles(member.getRoles())
	            .token(token.getAccess_Token())
	            .build();
	
	}
	 public MembersLoginResponse register(MembersCreateRequest request) throws Exception {
		 Members member;
		 TokenDto token;
		 try {
	            member = Members.builder()
	                    .password(passwordEncoder.encode(request.getPassword()))
	                    .nickname(request.getNickname())
	                    .email(request.getEmail())
	                    .build();
	            
	            token = TokenDto.builder().
	    	    		access_Token(jwtProvider.createToken(member.getEmail(), member.getRoles(),1000*60*60))
	                    .refresh_Token(jwtProvider.createToken(member.getEmail(), member.getRoles(),1000*60*60*12*3))
	                    .build(); 
	
	            member.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));
	            member.setRefreshToken(token.getRefresh_Token());
	            
	            memberRepository.save(member);
	        } catch (Exception e) {
	            System.out.println(e.getMessage());
	            throw new Exception("잘못된 요청입니다.");
	        }
	        
	        return MembersLoginResponse.builder()
		            .id(member.getId())
		            .email(member.getEmail())
		            .nickname(member.getNickname())
		            .roles(member.getRoles())
		            .token(token.getAccess_Token())
		            .build();
    }

    public TokenDto refreshAccessToken(TokenDto token) throws Exception {
        String email = jwtProvider.getAccount(token.getAccess_Token());
        Members member = memberRepository.findByEmail(email).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정정보입니다."));
        //리프레쉬 토큰의 유효기간이 남아있다면 액세스 토큰 발급
        if(jwtProvider.validateToken(member.getRefreshToken(),true)) {
        	return TokenDto.builder()
        			.access_Token(jwtProvider.createToken(email, member.getRoles(), 1000*60*60))
        			.build();
        }else {
        	throw new Exception("로그인을 다시 해주세요");
        }
    }
	 
}
