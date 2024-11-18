import { create } from 'zustand';
import { Environment } from '../types/supabase';
import { supabase } from '../lib/supabaseClient';

interface EnvironmentState {
  environments: Environment[];
  loading: boolean;
  error: string | null;
  selectedEnvironment: Environment | null;
  fetchEnvironments: () => Promise<void>;
  createEnvironment: (environment: Omit<Environment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEnvironment: (id: string, environment: Partial<Environment>) => Promise<void>;
  deleteEnvironment: (id: string) => Promise<void>;
  setSelectedEnvironment: (environment: Environment | null) => void;
}

export const useEnvironmentStore = create<EnvironmentState>((set, get) => ({
  environments: [],
  loading: false,
  error: null,
  selectedEnvironment: null,

  fetchEnvironments: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('environments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ environments: data as Environment[] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createEnvironment: async (environment) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('environments')
        .insert([{
          ...environment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      
      const { environments } = get();
      set({ environments: [data as Environment, ...environments] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateEnvironment: async (id, environment) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('environments')
        .update({
          ...environment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const { environments } = get();
      set({
        environments: environments.map((env) =>
          env.id === id ? (data as Environment) : env
        ),
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteEnvironment: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('environments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const { environments, selectedEnvironment } = get();
      set({
        environments: environments.filter((env) => env.id !== id),
        selectedEnvironment:
          selectedEnvironment?.id === id ? null : selectedEnvironment,
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedEnvironment: (environment) => {
    set({ selectedEnvironment: environment });
  },
}));