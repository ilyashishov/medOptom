<?php 
if(isset($_POST['name']) && isset($_POST['phone'])){
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$mail = $_POST['mail'];
	$address = $_POST['address'];
	$basket = $_POST['basket'];
	$allWeight = 0;
	$allCost = 0;

	$table  = '<html>';
	$table .= '<head>';
	$table .= '<title>1</title>';
	$table .= '</head>';
	$table .= '<body>';
	$table .= '<p><b>Имя: </b>'.$name.'</p>';
	$table .= '<p><b>Номер телефона: </b>'.$phone.'</p>';
	$table .= '<p><b>E-mail: </b>'.$mail.'</p>';
	$table .= '<p><b>Адрес: </b>'.$address.'</p>';

	$table .= '<table style="width: 100%; text-align: left">';
	$table .= '<tr>';
	$table .= '<th>Название</th>';
	$table .= '<th>Вес</th>';
	$table .= '<th>Цена</th>';
	$table .= '<th>Кол-во</th>';
	$table .= '<th>Стоимость</th>';
	$table .= '</tr>';

	foreach ($basket as $key => $value) {
		$allWeight += $value['weight'];
		$allCost += $value['cost'];

		$table .= '<tr>';
		$table .= '<td>'.$value['name'].'</td>';
		$table .= '<td>'.$value['weight'].'</td>';
		$table .= '<td>'.$value['price'].'</td>';
		$table .= '<td>'.$value['count'].'</td>';
		$table .= '<td>'.$value['cost'].'</td>';
		$table .= '</tr>';

	}

	$table .= '</table>';
	$table .= '<p>Общий вес: '.$allWeight.' кг, итого: '.$allCost.' руб.</p>';

	$table .= '</body>';
	$table .= '</html>';

	$to  = 'stalk1258@yandex.ru' . ', '; // обратите внимание на запятую
	$to .= 'artolya@gmail.com';

	$subject = 'Site';

	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$headers .= 'To: <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
	$headers .= 'From:<birthday@example.com>' . "\r\n";
	$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";


	mail($to, $subject, $table, $headers);
	if(isset($_POST['mail'])){
		$subject = "Ваша заявка принята";
		$mes = '<h1>Ваша заявка принята.</h1>';
		$mes = '<h2>Наш оператор свяжется с вами в ближайшее время</h2>'
		mail($mail, $subject, $mes, $headers);
	}

    echo 1;

}else{
	// header('HTTP/1.1 301 Moved Permanently');
	// header(Location: /);
}
 ?>