import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export type Cart = InferSelectModel<typeof carts>
export type NewCart = InferInsertModel<typeof carts>;


//this is for items in cart
export const cartLineItems = pgTable("cart_line_items", {  
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    cartId: integer("cart_id").notNull().references( () => carts.id,  {onDelete : "cascade"} ),
    itemName : varchar("item_name").notNull(),
    variant: varchar("variant"),
    qty: integer("qty").notNull(),
    price: numeric("amount").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
 })

export type CartLineItem = InferSelectModel<typeof cartLineItems>   

//relation between cart and cart_line_items, one cart can have many line items
export const cartRelations = relations(carts,  ({ many }) => ({
    lineItems: many(cartLineItems)
}));

//relation between cart_line_items and cart, one line item belongs to one cart
export const lineItemsRelations = relations( cartLineItems, ( {one} ) => ({
    cart: one(carts, {
        fields: [cartLineItems.cartId],
        references: [carts.id]
    })
})  )
