package com.coffeetrace.qr;

import com.coffeetrace.qr.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface QrCodeRepository extends JpaRepository<QrCode, String> {
    Optional<QrCode> findByUrlToken(String token);
}
