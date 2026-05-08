import csv
import json
import os

csv_path = "/Users/amrebid/Desktop/antigravity/quran set/facebook markting/EtsyListingsDownload.csv"
json_path = "/Users/amrebid/Desktop/antigravity/quran set/etsy-to-paypal-magic/src/data/products.json"

products = []

def try_read_csv(encoding):
    local_products = []
    with open(csv_path, mode='r', encoding=encoding) as f:
        reader = csv.DictReader(f)
        for row in reader:
            price_str = row.get('PRICE', '0')
            try:
                price = float(price_str.replace(',', ''))
            except:
                price = 0.0
                
            import re
            def slugify(text):
                text = text.lower()
                text = re.sub(r'[^a-z0-9\s-]', '', text)
                text = re.sub(r'[\s-]+', '-', text).strip('-')
                return text

            sku = row.get('SKU')
            title = row.get('TITLE', 'unknown')
            product_id = sku if sku and len(sku) > 2 else slugify(title)
            
            product = {
                "id": product_id,
                "title": title,
                "description": row.get('DESCRIPTION'),
                "price": price,
                "currency": row.get('CURRENCY_CODE'),
                "images": [row.get(f'IMAGE{i}') for i in range(1, 11) if row.get(f'IMAGE{i}')],
                "tags": row.get('TAGS', '').split(','),
                "sku": row.get('SKU')
            }
            local_products.append(product)
    return local_products

for enc in ['utf-8', 'utf-16', 'latin-1']:
    try:
        products = try_read_csv(enc)
        if products and products[0].get('title'):
            print(f"Successfully read with {enc}")
            break
    except Exception as e:
        print(f"Failed with {enc}: {e}")

os.makedirs(os.path.dirname(json_path), exist_ok=True)
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Converted {len(products)} products to JSON.")
