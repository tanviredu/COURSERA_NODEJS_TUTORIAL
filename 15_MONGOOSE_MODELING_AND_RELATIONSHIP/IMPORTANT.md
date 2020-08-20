1)There is two way of making relation
using normalization or using ref
in this case we store the object
id of a document in parent document
then use the populate() method to fetch the child
component
for fetching it needs two query


2)Second one is using subdoc (denormalization)
we directly inject another document
in other docuemnt as a sub document

it needs one query