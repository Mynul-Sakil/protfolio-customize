import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if any user already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return NextResponse.json({ message: 'Admin user already exists.' }, { status: 400 });
    }

    // Create the default admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password1@', salt);
    
    const newAdmin = new User({
      name: 'Mynul Islam',
      email: 'mynul.sakil@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();

    return NextResponse.json({ message: 'Default admin user created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
