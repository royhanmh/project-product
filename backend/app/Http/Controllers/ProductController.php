<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Create Product
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:150',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
        ]);

        $product = Product::create($validatedData);

        return response()->json(
            [
                'success' => true,
                'message' => 'Product created successfully!',
                'data' => $product,
            ],
            201,
        );
    }

    // Read Product List
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully!',
            'data' => $products,
        ]);
    }

    public function show(string $id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully!',
            'data' => $product,
        ]);
    }

    // Update Product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:150',
            'category' => 'sometimes|required|string|max:100',
            'price' => 'sometimes|required|numeric',
            'discount' => 'nullable|numeric',
        ]);

        $product->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully!',
            'data' => $product,
        ]);
    }

    // Delete Product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully!',
        ]);
    }
}
