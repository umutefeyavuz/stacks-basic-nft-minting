;; SIP-009 Temel NFT Minting Kontratı
(define-trait sip009-nft-trait
  (
    (get-token-uri (uint) (response (string-utf8 256) uint))
    (get-owner (uint) (response principal uint))
    (transfer (uint principal principal) (response bool uint))
    (mint (principal (string-utf8 256)) (response uint uint))
  )
)

(define-map token-owner ((token-id uint)) ((owner principal)))
(define-map token-uri ((token-id uint)) ((uri (string-utf8 256))))

(define-data-var next-token-id uint u1)

;; Mint fonksiyonu
(define-public (mint (to principal) (uri (string-utf8 256)))
  (let ((token-id (var-get next-token-id)))
    (begin
      (map-set token-owner ((token-id token-id)) ((owner to)))
      (map-set token-uri ((token-id token-id)) ((uri uri)))
      (var-set next-token-id (+ token-id u1))
      (ok token-id)
    )
  )
)

;; Transfer fonksiyonu
(define-public (transfer (token-id uint) (from principal) (to principal))
  (let ((owner (get owner (map-get? token-owner ((token-id token-id))))))
    (if (is-eq owner from)
        (begin
          (map-set token-owner ((token-id token-id)) ((owner to)))
          (ok true)
        )
        (err u403)
    )
  )
)

;; Token sahibi sorgulama
(define-read-only (get-owner (token-id uint))
  (match (map-get? token-owner ((token-id token-id)))
    entry (ok (get owner entry))
    (err u404)
  )
)

;; Token URI sorgulama
(define-read-only (get-token-uri (token-id uint))
  (match (map-get? token-uri ((token-id token-id)))
    entry (ok (get uri entry))
    (err u404)
  )
)

;; SIP-009 Trait impl
(impl-trait .sip009-nft-trait)