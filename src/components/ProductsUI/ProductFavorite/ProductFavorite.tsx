'use client';

import { FC } from 'react';
import styles from './product.module.scss';
import { Products } from '@/interfaces/products';
import Image from 'next/image';
import { Shop, Star } from 'grommet-icons';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { ShoppingCartButton } from '@/components/ui/ShoppingButton/ShoppingButton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addProductsFromCart } from '@/redux/slices/shoppingCartSlice';

interface ProductCartProps extends Products {
  productLinkTitle: string;
  onAddToFavorite?: () => void;
  onDeleteProduct: () => void;
}

export const ProductFavorite: FC<ProductCartProps> = ({
  title,
  name,
  category,
  price,
  productRating,
  mainImage,
  style,
  productId,
  priceDiscount = 0,
  productLinkTitle,
  onAddToFavorite,
  onDeleteProduct,
}) => {
  const discount = price - priceDiscount;

  const dispatch = useAppDispatch();

  const handleAddToShoppingCart = (product: Products) => {
    dispatch(addProductsFromCart(product));
  };

  return (
    <div className={styles.productCart}>
      <div className={styles.productCart__container}>
        <div className={styles.productImage}>
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            href={`${productLinkTitle}${encodeURIComponent(name)}`}
          >
            <Image
              className={styles.productImage}
              src={mainImage}
              width={300}
              height={300}
              alt={`product ${title} photo`}
            />
          </Link>
          {priceDiscount < 1 ? (
            ''
          ) : (
            <span className={styles.cardDiscount}>
              Disc: {Math.floor((discount / price) * 100)}%
            </span>
          )}
        </div>
        <div className={styles.productCart__Info}>
          <h3 className={styles.productCart__title}>{title}</h3>
          <p className={styles.productCart__price}>
            Price: {priceDiscount < 1 ? '' : priceDiscount}
            <mark
              className={styles.priceDiscount}
              style={{
                textDecoration: priceDiscount < 1 ? 'none' : 'line-through',
              }}
            >
              {'$'}
              {price}
            </mark>
          </p>
          <span className={styles.productCart__productRating}>
            Rating: {productRating}/5{' '}
            <Star color='gold' style={{ position: 'relative', bottom: 1.5 }} />
          </span>
          <span className={styles.productCart__style}>{style}</span>
          <br />
          <h3 className={styles.categoryBlock}>
            Category: <br />
            <strong className={styles.productCart__category}>{category}</strong>
          </h3>
          <div className={styles.productButtons__block}>
            <Button
              onClick={onAddToFavorite}
              onDeleteProduct={onDeleteProduct}
              type='button'
              className={styles.shopBtn}
              product={{
                category,
                images: [],
                mainImage,
                name,
                price,
                productId,
                productRating,
                priceDiscount,
                title,
                style,
              }}
            />
            <ShoppingCartButton
              product={{
                category,
                images: [],
                mainImage,
                name,
                price,
                productId,
                productRating,
                priceDiscount,
                title,
                style,
              }}
              onClick={handleAddToShoppingCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};