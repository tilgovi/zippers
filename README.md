This is an implementation of a [zipper][zipper] over JavaScript objects.

Traversal up/down/left/right is working.

TODO:

 * Fold/map functions
 * JSON serialization which replaces cross-structure references with a tag for
   deserializing, so redundant references to substructure are not sent over
   the wire.
 * Lift substructure out when traversing up in a way which is friendly toward
   future serialization format.
 * Tests

[zipper]: https://secure.wikimedia.org/wikipedia/en/wiki/Zipper_%28data_structure%29
