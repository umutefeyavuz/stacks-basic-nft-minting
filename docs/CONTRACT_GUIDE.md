# NFT Kontrat Kullanım Rehberi

## Mint Fonksiyonu

Yeni bir NFT mint etmek için:
```clarity
(mint tx-sender "ipfs://QmHash")
```
Dönen değer: Mint edilen token'ın ID'si.

## Transfer Fonksiyonu

Bir NFT'yi başka bir kullanıcıya transfer etmek için:
```clarity
(transfer u1 tx-sender 'SP2C2...)
```
Dönen değer: `(ok true)` (başarı) veya `(err u403)` (yetkisiz).

## Metadata URI

Her NFT, IPFS veya HTTPS ile metadata URI'si saklar.

## Sorgu Fonksiyonları

- `get-owner`: Token'ın sahibini döndürür.
- `get-token-uri`: Token'ın metadata URI'sini döndürür.

---

Detaylar için kontrat dosyasını inceleyiniz.