import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage, FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const attractionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
  sortOrder: z.coerce.number().int().min(0, { message: "Sort order must be a positive number" })
});

type AttractionForm = z.infer<typeof attractionSchema>;

interface Attraction {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function AttractionsManager() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch attractions
  const { data: attractions, isLoading } = useQuery({
    queryKey: ['/api/attractions'],
    queryFn: async () => {
      const response = await apiRequest('/api/attractions');
      const data = await response.json();
      return data.attractions || [];
    }
  });

  // Form setup for adding attraction
  const form = useForm<AttractionForm>({
    resolver: zodResolver(attractionSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      sortOrder: 0
    },
  });

  // Form setup for editing attraction
  const editForm = useForm<AttractionForm>({
    resolver: zodResolver(attractionSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      sortOrder: 0
    },
  });

  // Add attraction mutation
  const addAttractionMutation = useMutation({
    mutationFn: async (data: AttractionForm) => {
      const response = await apiRequest('/api/admin/attractions', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/attractions'] });
      toast({
        title: "Attraction Added",
        description: "The attraction has been successfully added.",
      });
      setIsAddDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.error("Error adding attraction:", error);
      toast({
        title: "Error",
        description: "Failed to add the attraction. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Edit attraction mutation
  const editAttractionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: AttractionForm }) => {
      return await apiRequest(`/api/admin/attractions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/attractions'] });
      toast({
        title: "Attraction Updated",
        description: "The attraction has been successfully updated.",
      });
      setIsEditDialogOpen(false);
      setSelectedAttraction(null);
    },
    onError: (error) => {
      console.error("Error updating attraction:", error);
      toast({
        title: "Error",
        description: "Failed to update the attraction. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete attraction mutation
  const deleteAttractionMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/attractions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/attractions'] });
      toast({
        title: "Attraction Deleted",
        description: "The attraction has been successfully deleted.",
      });
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    },
    onError: (error) => {
      console.error("Error deleting attraction:", error);
      toast({
        title: "Error",
        description: "Failed to delete the attraction. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onAddSubmit = (data: AttractionForm) => {
    addAttractionMutation.mutate(data);
  };

  const onEditSubmit = (data: AttractionForm) => {
    if (selectedAttraction) {
      editAttractionMutation.mutate({ id: selectedAttraction.id, data });
    }
  };

  const handleEdit = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    editForm.reset({
      title: attraction.title,
      description: attraction.description,
      imageUrl: attraction.imageUrl,
      sortOrder: attraction.sortOrder
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteAttractionMutation.mutate(deleteId);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Attractions</CardTitle>
            <CardDescription>Manage the attractions displayed on the website</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Attraction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Attraction</DialogTitle>
                <DialogDescription>
                  Create a new attraction that will be displayed on the website.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Botanical Garden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the attraction..." 
                            {...field} 
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="/uploads/attraction.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a valid image URL or upload path
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Lower numbers appear first
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={addAttractionMutation.isPending}
                    >
                      {addAttractionMutation.isPending ? "Saving..." : "Save Attraction"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading attractions...</p>
            </div>
          ) : !attractions || attractions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="mb-4 text-muted-foreground">No attractions found</p>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                Add your first attraction
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="hidden md:table-cell">Image</TableHead>
                    <TableHead className="hidden md:table-cell">Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attractions.map((attraction: Attraction) => (
                    <TableRow key={attraction.id}>
                      <TableCell className="font-medium">{attraction.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {attraction.description.length > 100
                          ? `${attraction.description.substring(0, 100)}...`
                          : attraction.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {attraction.imageUrl ? (
                          <div className="h-12 w-12 overflow-hidden rounded-md">
                            <img 
                              src={attraction.imageUrl} 
                              alt={attraction.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No image</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{attraction.sortOrder}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(attraction)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(attraction.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Attraction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Attraction</DialogTitle>
            <DialogDescription>
              Update the attraction details.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a valid image URL or upload path
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Lower numbers appear first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={editAttractionMutation.isPending}
                >
                  {editAttractionMutation.isPending ? "Saving..." : "Update Attraction"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              attraction from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteAttractionMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}