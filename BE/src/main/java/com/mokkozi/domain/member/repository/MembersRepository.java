package com.mokkozi.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mokkozi.domain.member.entity.Members;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {
	Optional<Members> findByEmail(String email);
	Optional<Members> findByNickname(String nickname);
	Optional<Members> findByPassword(String password);

}
