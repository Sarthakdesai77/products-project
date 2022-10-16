Create four tables 
1. Users
Users table will contain the below columns 
a. ID (Primary Key) <- auto increment 
b.created_At (timestamp with time zone)
c.updated_At (timestamp with time zone)
d.deleted_At (timestamp with time zone)
e.first_name
f.last_name 
g.mobile_number 
h.address_line1
i.address_line2(optional)

2. Products 
a.ID(Primary Key) <- auto increment 
b.created_At (timestamp with time zone)
c.updated_At(timestamp with time zone)
d.deleted_At(timestamp with time zone)
e.product_name
f.description
e.offer_price
g.mrp
h.margin

3. Orders 
a.ID(Primary Key) <- auto increment 
b.created_At (timestamp with time zone)
c.updated_At(timestamp with time zone)
d.deleted_At(timestamp with time zone)
e.user_id(foreign key) <-- from users table
f.product_id(foreign key) <-- from products table

and create the below-mentioned APIs based on the above tables 

1. make CRUD API operation on the user's table 
2. make GET API  which contains the number of products ordered on a monthly and yearly basis 
3.  make an API that shows the number of users who have ordered a product name WHEAT
4. make an API which margins of the products: the list should be in descending order
