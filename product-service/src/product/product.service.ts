import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    async createProduct(data: any) {
        try {
            const createNewProduct = await this.productRepository.save(data);
            return {
                message: "Product succefully created",
                result: createNewProduct
            }
        } catch (error) {
            throw error;
        }
    }

    async findAllProducts() {
        const allProds = await this.productRepository.find();
        return allProds;
    }

    async findById(prod_id: number) {
        const product = await this.productRepository.findOne({where: {
            id: prod_id
        }});

        return {
            message: 'Product fetched successfully',
            result: { product },
        }
    }

    async updateProduct(data: any) {
        const product = await this.productRepository.findOne({where: {
            id: data.prod_id
        }});

        if(!product) {
            return "Product missing from invertory";
        }

        const updateProduct = await this.productRepository.update(data.prod_id, data.updateProductData);
        return {
            message: "Your product is updated",
            product: updateProduct
        }
    }

    async deleteProduct(prod_id: any) {
        const product = await this.productRepository.findOne({where: {
            id: prod_id
        }});

        if(!product) {
            return "Product missing from invertory";
        }

        const deleteProd = await this.productRepository.delete(prod_id);
        return "Your product is deleted";
    }
}
