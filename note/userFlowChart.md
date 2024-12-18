```mermaid
graph TD;
    A[Start] --> B{Is it working?};
    B -->|Yes| C[Continue];
    B -->|No| D[Fix it];
    D --> B;
    C --> E[End];
</code_block_to_apply_changes_from>
```
