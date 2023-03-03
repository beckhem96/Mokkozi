package com.mokkozi.global.oauth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mokkozi.domain.member.entity.Members;
import com.mokkozi.domain.member.repository.MembersRepository;
import com.mokkozi.global.oauth.model.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService{
	
	private final MembersRepository membersRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Members member = membersRepository.findByEmail(email).orElseThrow(
				()->new UsernameNotFoundException("Invalid authentication!")
				);
		return new CustomUserDetails(member);
	}
	
}
	
	
