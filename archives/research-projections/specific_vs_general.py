"""
┌────────────┐  ┌─────────────┐  ┌──────────────┐
│            │  │             │  │              │
│Pre-process?├─►│PG Projection├─►│ Post-process │
│            │  │             │  │              │
└────────────┘  └─────────────┘  └──────────────┘
"""



"""
Question - 

"""

"""
Very Pre-Projection Processing Heavy

Notes
- Query time is faster
- Probably can't answer more than one specific question

"""

def hydrate_projection():
    for event in stream:
        current_sum = get_sum_from_db()
        current_sum += event['value']
        save_sum_to_db(current_sum)


def get_data_for_api_call():
    query = """
        SELECT
            *
        FROM
            inventory_table
        ;
    """

    data = perform_query(query)
    print(data) # -> {current_sum: 100}


"""
# Very Post-Projection Processing Heavy

Notes
- Query time is, maybe, slower?
- Can answer many more questions
"""


def hydrate_projection():
    for event in stream:
        save_event_to_db(event)

def get_data_for_api_call():
    query = """
        SELECT
            sku,
            SUM(inventory)
        FROM
            inventory_table
        GROUP BY
            sku
    """

    data = perform_query(query)
    print(data) # -> {foo123: 100, bar456: 50}
