select 1, 2, 3, CAST('foo' as VARCHAR)
from sometable JOIN ( select * from foo ) a ON sometable.id = a.id 
~~~
select
	1,
	2,
	3,
	CAST('foo' as VARCHAR)
from
	sometable
	JOIN (
		select
			*
		from
			foo
	) a ON sometable.id = a.id