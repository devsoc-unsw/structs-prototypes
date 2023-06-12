set $n = list->head
while $n
  printf "Data: %d, Address: %p, Next: %p\n", $n->data, $n, $n->next
  set $n = $n->next
end
