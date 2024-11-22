package com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyTokenRepository extends JpaRepository<MyToken, Long> {
    @Query("""
            select t from MyToken t inner join MyUser u on t.user.id = u.id
            where t.user.id = :userId and t.loggedOut = false
            """)
    List<MyToken> findAllAccessTokenByUser(long userId);

    Optional<MyToken> findByAccessToken(String accessToken);

    Optional<MyToken> findByRefreshToken(String refreshToken);

    @Modifying
    @Transactional
    @Query("DELETE from MyToken t WHERE t.user.id = :id")
    void deleteMyTokenByUserId(long id);
}
