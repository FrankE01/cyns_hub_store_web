"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  X,
  Search,
} from "lucide-react";
import { useCMSStore, cmsStore } from "../../../lib/store/useCMSStore";
import { Category } from "../../../lib/types";

export default function AdminCategoriesPage() {
  const { categories, products } = useCMSStore();
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const startCreate = () => {
    setName("");
    setSlug("");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800");
    setIsCreating(true);
    setIsEditing(null);
  };

  const startEdit = (cat: Category) => {
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
    setIsEditing(cat.id);
    setIsCreating(false);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (isCreating) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const saveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    if (isCreating) {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        image: image.trim(),
        itemCount: 0,
      };
      cmsStore.addCategory(newCat);
      setIsCreating(false);
    } else if (isEditing) {
      cmsStore.updateCategory(isEditing, {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        image: image.trim(),
      });
      setIsEditing(null);
    }
  };

  const deleteCategory = (id: string) => {
    if (confirm("Are you sure you want to remove this category? Products within it will remain in the catalog.")) {
      cmsStore.deleteCategory(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
            Catalog Hierarchy
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
            Category Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Organize products into customer-facing departments with custom imagery and SEO descriptions.
          </p>
        </div>

        <button
          type="button"
          onClick={startCreate}
          className="h-10 px-4 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center space-x-1.5 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Category Creation / Edit Modal or Inline Panel */}
      {(isCreating || isEditing) && (
        <form
          onSubmit={saveCategory}
          className="bg-white p-6 rounded-xl border border-[#475438]/40 shadow-md space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="font-serif text-base font-semibold text-stone-900">
              {isCreating ? "Create New Department Category" : "Edit Category Details"}
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setIsEditing(null);
              }}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Category Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Resort Wear"
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. resort-wear"
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Department Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description displayed on category header..."
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Department Cover Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setIsEditing(null);
              }}
              className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#475438] hover:bg-[#3A452E] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isCreating ? "Create Category" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid Table */}
      <div className="bg-white rounded-xl border border-[#EBE5DC] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#EBE5DC] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-9 pr-3.5 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>

          <span className="text-xs text-stone-500">
            Showing {filtered.length} categories
          </span>
        </div>

        <div className="divide-y divide-[#EBE5DC]">
          {filtered.map((cat) => {
            const actualCount = products.filter(
              (p) => p.category === cat.slug || p.tags.includes(cat.name)
            ).length;

            return (
              <div
                key={cat.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 shrink-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif text-base font-semibold text-stone-900">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                        /{cat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                      {cat.description}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-medium text-[#475438]">
                      {actualCount} Active Silhouettes
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Link
                    href={`/shop/${cat.slug}`}
                    target="_blank"
                    className="p-2 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-100 transition-colors"
                    title="View live category page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => startEdit(cat)}
                    className="p-2 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors"
                    title="Edit category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCategory(cat.id)}
                    className="p-2 text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
