define plist
  set $n = $arg0->head
  while $n
    printf "%d ", $n->data
    set $n = $n->next
  end
end

document plist
  Print the whole linked list.
  Usage: plist <list-variable-name>
end
