import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/productSchema";
import { NextResponse } from "next/server";


export async function PATCH(request,{params}){
    const {id}= params;
    try{
        await dbConnect();
        const body = await request.json();
        console.log(body)
        const data = await Product.findByIdAndUpdate(id,body,{new:true});
        if(!data){
            return NextResponse.json({msg:"Product doesn't exist"},{status:404})
        }
        return NextResponse.json({data},{status:200});
    }
    catch(error){
        return NextResponse.json({error},{status:500});
    } 
}



export async function DELETE(request,{params}){
    const {id}= params;
    try{
        await dbConnect();
        const data = await Product.findByIdAndDelete(id);
        if(!data){
            return NextResponse.json({msg:"Product doesn't exist"},{status:404})
        }
        return NextResponse.json({msg:"Deleted Successfully",data},{status:200});
    }
    catch(error){
        return NextResponse.json({error},{status:500});
    } 
}

