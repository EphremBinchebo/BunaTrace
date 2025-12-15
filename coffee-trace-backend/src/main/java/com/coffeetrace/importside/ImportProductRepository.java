package com.coffeetrace.importside;

import com.coffeetrace.importside.ImportProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportProductRepository extends JpaRepository<ImportProduct, String> {}