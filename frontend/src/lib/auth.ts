import { supabase } from './supabase';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const baseRegisterSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const registerClientSchema = baseRegisterSchema;

export const registerOrganizerSchema = z.object({
  ...baseRegisterSchema.shape,
  organizerName: z.string().min(2, "Le nom de l'organisation doit contenir au moins 2 caractères"),
});

// Auth functions
export const login = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    toast.success('Connexion réussie');
    return { success: true };
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error('Erreur lors de la connexion');
    return { success: false, error };
  }
};

export const registerClient = async (data: z.infer<typeof registerClientSchema>) => {
  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: 'client',
        },
      },
    });

    if (signUpError) throw signUpError;

    toast.success('Inscription réussie');
    return { success: true };
  } catch (error) {
    console.error('Error registering client:', error);
    toast.error("Erreur lors de l'inscription");
    return { success: false, error };
  }
};

export const registerOrganizer = async (data: z.infer<typeof registerOrganizerSchema>) => {
  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          organizer_name: data.organizerName,
          role: 'organizer',
        },
      },
    });

    if (signUpError) throw signUpError;

    toast.success('Inscription réussie');
    return { success: true };
  } catch (error) {
    console.error('Error registering organizer:', error);
    toast.error("Erreur lors de l'inscription");
    return { success: false, error };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    toast.success('Déconnexion réussie');
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    toast.error('Erreur lors de la déconnexion');
    return { success: false, error };
  }
};