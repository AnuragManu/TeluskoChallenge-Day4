package com.example.productmanagerday4;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin
class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{productName}")
    public Product getProduct(@PathVariable String productName) {
        return service.getProduct(productName);
    }

    @GetMapping("/search/text")
    public List<Product> searchByText(@RequestParam String text) {
        return service.searchByText(text);
    }

    @GetMapping("/search/place")
    public List<Product> searchByPlace(@RequestParam String place) {
        return service.searchByPlace(place);
    }

    @GetMapping("/search/warranty")
    public List<Product> searchByWarranty(@RequestParam int warranty) {
        return service.searchByWarranty(warranty);
    }

    @PostMapping("/")
    public void addProduct(@RequestBody Product product) {
        service.addProduct(product);
    }
}
