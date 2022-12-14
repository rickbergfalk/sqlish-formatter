select 1,     2, 3 
from sometable 
LEFT outer JOIN foo ON "sometable".id = [foo].id
~~~
select
	1,
	2,
	3
from
	sometable
	LEFT outer JOIN foo ON "sometable".id = [foo].id