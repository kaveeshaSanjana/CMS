package edu.icet.controller;

import edu.icet.service.impl.KafkaProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaProducer kafkaProducer;

    @GetMapping
    public void test(){
        System.out.println("test");
    }

    @PostMapping("/publish")
    public ResponseEntity<String> publish(@RequestParam String message) {
        kafkaProducer.sendMessage("test-topic", message);
        return ResponseEntity.ok("Message sent to Kafka");
    }
}
